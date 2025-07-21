from langchain_core.prompts import PromptTemplate
from langchain_huggingface import ChatHuggingFace,HuggingFaceEndpoint
import os 

def LLM_setup():
    """
    Set up the LLM model for text generation.
    
    Returns:
        ChatHuggingFace: Configured LLM model.
    """
    
    llm = HuggingFaceEndpoint(
        repo_id="meta-llama/Llama-3.1-8B-Instruct",
        task="text-generation",
        huggingfacehub_api_token=os.environ.get("HUGGINGFACE_TOKEN")
    )
    return ChatHuggingFace(llm=llm)


def script_prompt():
    template = PromptTemplate(
        template=(
        """
        Generate a short 5-6 minute podcast script on the topic: {topic}.\n
        use name of host as {first_name} and guest name as {second_name}.\n
        Podcast style should be : {description}\n
        Return output in strict JSON format like this (as a list of dicts):
        [
          {{"character": "Host", "text": "Welcome to our podcast..."}},
          {{"character": "Guest", "text": "Thanks! I'm excited to be here..."}}
        ]
        Only return valid JSON. Do not include markdown formatting or explanations.
        """
        ),
        input_variables=["topic","description","first_name","second_name"]
    )
    return template



def script_audio_podcast():
    # nickmalhotra/ProjectIndus
    template = PromptTemplate(
        template="""
        Generate a short 5-6 minute podcast script on the topic: {topic}.\n
        use name of host as {first_name} and guest name as {second_name}.\n
        Podcast style should be : {description}\n
        Return output in strict JSON format like this (as a list of dicts):
        [
          {{"character": "Host", "text": "Welcome to our podcast..."}},
          {{"character": "Guest", "text": "Thanks! I'm excited to be here..."}}
        ]
        Only return valid JSON. Do not include markdown formatting or explanations.
        """,
        input_variables=["topic","description","first_name","second_name"]
        )
    return template


def summery_prompt():
    template = PromptTemplate(
        template="""above is the podcast script \n {script} \n lpease return 1-2 lines of summery for this podcast script\n dont add lines like 'here is your summery or like that' just give me the summery""",
        input_variables=['script']
    )

    return template

def format_dialogue_lines(dialogue):
    """
    Convert structured dialogue dicts to clean line-by-line format.
    
    Args:
        dialogue (list): List of dictionaries with 'character' and 'text'.
        
    Returns:
        str: A formatted multiline string.
    """
    lines = []
    for line in dialogue:
        character = line.get("character", "Unknown")
        text = line.get("text", "").strip()
        lines.append(f"{character}: {text}")
    return "\n".join(lines)
