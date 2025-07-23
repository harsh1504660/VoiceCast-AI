
from fastapi import FastAPI, HTTPException
import uvicorn
from utils import LLM_setup, script_prompt,script_audio_podcast,summery_prompt,format_dialogue_lines
import json
import re
def test(topic, description, first_host, second_host):
    model = LLM_setup()
    prompt = script_audio_podcast()
    chain = prompt | model

    response = chain.invoke({
        "topic": topic,
        "description": description,
        "first_name": first_host,
        "second_name": second_host
    })

    print("response : ", response.content)

    # Step 1: Parse JSON safely
    try:
        parsed_content = json.loads(response.content)
    except json.JSONDecodeError as e:
        print("❌ Failed to parse LLM response as JSON:", e)
        return []

    # Step 2: Flatten nested lists if needed
    if isinstance(parsed_content, list):
        if all(isinstance(line, list) for line in parsed_content):
            parsed_content = [item for group in parsed_content for item in group]
    else:
        print("❌ Unexpected response format.")
        return []

    print("parsed_content ✅:", parsed_content)

    # Step 3: Replace character names if needed
    character_map = {
        "Host": "1324",
        "Guest": "4567"
    }

    updated_dialogue = []
    for line in parsed_content:
        if not isinstance(line, dict):
            print("⚠️ Skipping invalid line (not a dict):", line)
            continue
        if "character" not in line or "text" not in line:
            print("⚠️ Skipping incomplete line:", line)
            continue

        updated_dialogue.append({
            "character": character_map.get(line["character"], line["character"]),
            "text": line["text"]
        })

    # Step 4: Format script for summary
    script = format_dialogue_lines(parsed_content)
    print("script ===========", str(script))

    summery_promptt = summery_prompt()
    prompt_str = summery_promptt.format(script=script)
    response = model.invoke(prompt_str)

    print("final response:", response.content)

    return updated_dialogue  # or return response.content if you want summary
test('cricket','story','harsh','bulla')


name = "harsh & sunil"
n1, n2 = [n.strip() for n in name.split('&')]
print(n1, n2)