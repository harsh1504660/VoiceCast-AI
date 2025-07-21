
from fastapi import FastAPI, HTTPException
import uvicorn
from utils import LLM_setup, script_prompt,script_audio_podcast,summery_prompt,format_dialogue_lines
import json
def test(topic,description,first_host,second_host):
    prompt = script_prompt()
    llm = LLM_setup()
    chain = prompt | llm
    response = chain.invoke({"topic": topic,"description":description,"first_name":first_host,"second_name":second_host})
    try:
        script_data = json.loads(response.content)
        if not isinstance(script_data, list):
            raise ValueError(f"Expected a list, got {type(script_data)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse LLM response: {str(e)}")
    
    character_voice_map = {
        "Host": {"avatar_id": "Amelia_sitting_business_training_side", "voice_id": "4754e1ec667544b0bd18cdf4bec7d6a7"},
        "Guest": {"avatar_id": "Emanuel_sitting_Sofa_side", "voice_id": "8a9fd0a131c94da08b761389e1e07cee"}
    }
    video_inputs = []
    for entry in script_data:
        char = entry.get("character")
        text = entry.get("text")
        if not char or not text:
            continue
        
        avatar_info = character_voice_map.get(char)
        if not avatar_info:
            continue  # Skip unknown characters

        video_inputs.append({
            "character": {
                "type": "avatar",
                "avatar_id": avatar_info["avatar_id"],
                "avatar_style": "normal"
            },
            "voice": {
                "type": "text",
                "input_text": text,
                "voice_id": avatar_info["voice_id"]
            },

        })

    print("ecerything fine till now ==========================")
    try:
        parsed_content = json.loads(response.content)
    except json.JSONDecodeError as e:
        print("❌ Failed to parse LLM response as JSON:", e)
        return []

    print("======================parsed the contnen")
    character_map = {
    "Host": "1324",
    "Guest": "4567"
    }
    updated_dialogue = [
        {
            "character": character_map.get(line["character"], line["character"]),
            "text": line["text"]
        }
        for line in parsed_content
    ]
    
    summery_promptt = summery_prompt()

    print("===============formatting script")
    script = format_dialogue_lines(parsed_content)
    print(str(script))

    prompt_str = summery_promptt.format(script=script)
    model = LLM_setup()
    response = model.invoke(prompt_str)
    print("response generated =========================")


test('cricket','story','harsh','bulla')