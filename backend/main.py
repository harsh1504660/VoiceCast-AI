from fastapi import FastAPI, HTTPException
import uvicorn
from utils import LLM_setup, script_prompt,script_audio_podcast,summery_prompt,format_dialogue_lines
from pydantic import BaseModel
from dotenv import load_dotenv
from elevenlabs import ElevenLabs
import requests
from fastapi.middleware.cors import CORSMiddleware
import os
import time
app = FastAPI()
import json
from audio_gen import genrate_audio
from upload import upload_to_catbox,download_file
from images import fetch_unsplash_image
load_dotenv()

#allow_origin_regex=r"https://.*netlify\.app",
app.add_middleware(
    CORSMiddleware,
    alow_origin=["http://localhost:8080"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=False,  # Only True if you're using cookies/auth headers
)


@app.get('/')
def root():
    return {"message": "status 200, app is running"}
from sqlalchemy import insert
from database import engine  # your SQLAlchemy engine
from models import video_links

def store_video_link(video_url,username,hasvid,hosts,title,topicCat,img_url,summary='0',transcript='0'):
    with engine.connect() as conn:
        print(img_url,"=========inside store function")
        stmt = insert(video_links).values(video_url=video_url,name=username,has_vid=hasvid,hosts=hosts,title=title,topic=topicCat,img_url=img_url,summary=summary,transcript=transcript)
        conn.execute(stmt)
        conn.commit()



class Topicrequest(BaseModel):
    topic: str
    name:str
    avatar:str
    hasvid:bool
    topicCat:str
    description:str
class VideoScriptRequest(BaseModel):
    script: str
    character_id: str
    voice_id: str
    


def poll_video_status(video_id,mainkey, interval=5, timeout=300):
    status_url = f"https://api.heygen.com/v1/video_status.get?video_id={video_id}"
    start_time = time.time()
    headers = {
        "Content-Type": "application/json",
        "X-Api-Key": f"{mainkey}"
    }
    while time.time() - start_time < timeout:
        status_response = requests.get(status_url, headers=headers)
        status_data = status_response.json()
        
        status = status_data.get("data", {}).get("status")
        print("Video Status:", status)

        if status == "completed":
            video_url = status_data["data"]["video_url"]
            print("✅ Video Ready at:", video_url)
            return video_url
        elif status == "failed":
            print("❌ Video rendering failed.")
            return None
        
        time.sleep(interval)  # wait before polling again
    
    print("⏰ Timeout while waiting for video to be ready.")
    return None


#Amelia_sitting_business_training_side       4754e1ec667544b0bd18cdf4bec7d6a7
#Emanuel_sitting_Sofa_side                   8a9fd0a131c94da08b761389e1e07cee

#Brandon_Office_Sitting_Side_public          897d6a9b2c844f56aa077238768fe10a
#Gala_sitting_businesssofa_side              1704ea0565c04c5188d9b67062b31a1a

#Leos_sitting_sofa_side                     8a021ecf219e4d638463f751235a7187
# Ida_sitting_sofa_side                       1a9bfb4ec9bc43d59ab64a4e66fe467c

#Leszek_sitting_sofa_front                   8a4dfef7aacf4ad88c10ae9391bd3098
#Noah_sitting_sofa_front                     8a8fb6db01a44463a087e68f54d0870b

# Martina_sitting_sofa_front                 914b48de04db4a99a97d8e952c4afc2d
# Masha_sitting_sofacasual_front             94e5f79c6cf745babe63f4c8c4d6a0f1







@app.post('/script')
async def get_script(req: Topicrequest):
    topic = req.topic
    hosts = req.avatar
    hasvid = req.hasvid
    username = req.name
    topicCat = req.topicCat
    description = req.description

    first_host, second_host = hosts.split('-')
    print("description : ",description)
    print("hosts are : ",hosts)
    # Step 1: Generate script from LLM
    prompt = script_prompt()
    llm = LLM_setup()
    chain = prompt | llm
    response = chain.invoke({"topic": topic,"description":description,"first_name":first_host,"second_name":second_host})

    # Step 2: Parse and validate JSON response
    try:
        script_data = json.loads(response.content)
        if not isinstance(script_data, list):
            raise ValueError(f"Expected a list, got {type(script_data)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse LLM response: {str(e)}")

    # Step 3: Combine all lines into a readable script
    #print(full_script)


    character_voice_map = {
        "Host": {"avatar_id": "Amelia_sitting_business_training_side", "voice_id": "4754e1ec667544b0bd18cdf4bec7d6a7"},
        "Guest": {"avatar_id": "Emanuel_sitting_Sofa_side", "voice_id": "8a9fd0a131c94da08b761389e1e07cee"}
    }

    if(hosts=='amelia-emanual'):
        character_voice_map["Host"]["avatar_id"] = 'Amelia_sitting_business_training_side'
        character_voice_map["Host"]["voice_id"] = '4754e1ec667544b0bd18cdf4bec7d6a7'
        character_voice_map["Guest"]["avatar_id"] = 'Emanuel_sitting_Sofa_side'
        character_voice_map["Guest"]["voice_id"] = '8a9fd0a131c94da08b761389e1e07cee'
    elif (hosts=='brandon-gala'):
        character_voice_map["Host"]["avatar_id"] = 'Brandon_Office_Sitting_Side_public'
        character_voice_map["Host"]["voice_id"] = '897d6a9b2c844f56aa077238768fe10a'
        character_voice_map["Guest"]["avatar_id"] = 'Gala_sitting_businesssofa_side'
        character_voice_map["Guest"]["voice_id"] = '1704ea0565c04c5188d9b67062b31a1a'   
    elif(hosts=='leos-ida'):
        character_voice_map["Host"]["avatar_id"] = 'Leos_sitting_sofa_side'
        character_voice_map["Host"]["voice_id"] = '8a021ecf219e4d638463f751235a7187'
        character_voice_map["Guest"]["avatar_id"] = 'Ida_sitting_sofa_side'
        character_voice_map["Guest"]["voice_id"] = '1a9bfb4ec9bc43d59ab64a4e66fe467c' 
    elif(hosts=='leszek-noah'):
        character_voice_map["Host"]["avatar_id"] = 'Leszek_sitting_sofa_front'
        character_voice_map["Host"]["voice_id"] = '8a4dfef7aacf4ad88c10ae9391bd3098'
        character_voice_map["Guest"]["avatar_id"] = 'Noah_sitting_sofa_front'
        character_voice_map["Guest"]["voice_id"] = '8a8fb6db01a44463a087e68f54d0870b'
    else:
        character_voice_map["Host"]["avatar_id"] = 'Martina_sitting_sofa_front'
        character_voice_map["Host"]["voice_id"] = '914b48de04db4a99a97d8e952c4afc2d'
        character_voice_map["Guest"]["avatar_id"] = 'Masha_sitting_sofacasual_front'
        character_voice_map["Guest"]["voice_id"] = '94e5f79c6cf745babe63f4c8c4d6a0f1'

        
    # Build video_inputs for each line
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
        #print(video_inputs)

    # Send this to Heygen
    url = "https://api.heygen.com/v2/video/generate"
    headers = {
        "Content-Type": "application/json",
        "X-Api-Key": "demo"
    }
    # video_inputs=[{
    #   "character": {
    #     "type": "avatar",
    #     "avatar_id": "Carlotta_BizTalk_Side_public"
    #   },
    #   "voice": {
    #     "type": "text",
    #     "input_text": "Hey, welcome to our AI podcast!",
    #     "voice_id": "4754e1ec667544b0bd18cdf4bec7d6a7"
    #   }
    # },
    # {
    #   "character": {
    #     "type": "avatar",
    #     "avatar_id": "Emanuel_sitting_Sofa_side"
    #   },
    #   "voice": {
    #     "type": "text",
    #     "input_text": "Thanks! Today's topic is fascinating.",
    #     "voice_id": "8a9fd0a131c94da08b761389e1e07cee"
    #   }
    # },
    # {
    #   "character": {
    #     "type": "avatar",
    #     "avatar_id": "Carlotta_BizTalk_Side_public"
    #   },
    #   "voice": {
    #     "type": "text",
    #     "input_text": "Testing the voice",
    #     "voice_id": "4754e1ec667544b0bd18cdf4bec7d6a7"
    #   }
    # },
    # {
    #   "character": {
    #     "type": "avatar",
    #     "avatar_id": "Emanuel_sitting_Sofa_side"
    #   },
    #   "voice": {
    #     "type": "text",
    #     "input_text": "Testing completed thanks",
    #     "voice_id": "8a9fd0a131c94da08b761389e1e07cee"
    #   }
    # },
    

    # ]
    
    payload = {
        "test": True,
        "video_inputs": video_inputs,
       "dimension": {
  "width": 1280,
  "height": 720
}
          # Allowed for free-tier users
    
    }

    api_keys = [
        os.getenv('hg_api1'),
        os.getenv('hg_api2'),
        os.getenv('hg_api3'),
        os.getenv('hg_api4'),
        os.getenv('hg_api5'),
        os.getenv('hg_api6'),
        os.getenv('hg_api7'),
        os.getenv('hg_api8')
    ]
    mainkey=''
    for idx, key in enumerate(api_keys):
        try:
            print(f"Trying API key {idx + 1}/{len(api_keys)}...")
            headers["X-Api-Key"] = key
            response =requests.post(url, headers=headers, data=json.dumps(payload))
              # success
            response.raise_for_status()

            print("✅ Success!")
            print("Response:", response.json())
            print("MAINKEY = ===",mainkey)
            mainkey = key
            break  # Exit loop on success
        except Exception as e:
            print(f"API key {idx + 1} failed: {e}")



    print("response : ===============",response)
   # print("this is the exact response : ",response.json())
    video_id = response.json()['data']['video_id']
    print("this is the vedio id : ",video_id)
    if video_id:
        video_url = poll_video_status(video_id,mainkey)
    filepath = download_file(video_url)
    url = upload_to_catbox(filepath)            ### final url
    img_url = fetch_unsplash_image(topic)
    #video_url = "https://files.catbox.moe/iyqdg0.mp4"
    

    try:
        parsed_content = json.loads(response.content)
    except json.JSONDecodeError as e:
        print("❌ Failed to parse LLM response as JSON:", e)
        return []

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

    script = format_dialogue_lines(parsed_content)
    print(str(script))

    prompt_str = summery_promptt.format(script=script)
    model = LLM_setup()
    response = model.invoke(prompt_str)



    img_url = fetch_unsplash_image(topic)
    
    
    
    
    
    store_video_link(video_url=video_url,username=username,hosts=hosts,hasvid=hasvid,title=str(topic),transcript=str(script),summary=response.content,topicCat=topicCat,img_url=img_url)
    return {"video_url":video_url}



from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
#from models import Base, Episode
from database import engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware
#Base.metadata.create_all(bind=engine)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
class EpisodeCreate(BaseModel):
    video_url: str

class EpisodeResponse(EpisodeCreate):
    id: str









@app.get("/videos")
def get_videos(db: Session = Depends(get_db)):
    result = db.execute(video_links.select()).fetchall()
    return [{"id": str(row.id), "video_url": row.video_url, "name":str(row.name), "hosts":str(row.hosts), "has_vid":row.has_vid,"title": str(row.title),"topic":str(row.topic),"img_url":(row.img_url) } for row in result]



class AudioPodcastRequest(BaseModel):
    topic:str
    hosts:str
    topicCat:str
    hasvid:bool
    name:str
    description:str



#vidhi Oq0cIHWGcnbOGozOQv0t        ->>>>replace
#Lily  t4U671CQHG58R11znrVj    ->>>replace   

#emads   jCxbkArMg3nfWZAmsdkB        ->>>replace
#marisaa L0yTtpRXzdyzQlzALhgD       ->>>replace
 
#clara  EIsgvJT3rwoPvRFG6c4n 
#mark   3jR9BuQAOPMWUjWpi0ll        ->>>replace


#adam s3TPKV1kjDlVtZbl4Ksh
#Erik Fz7HYdHHCP1EF1FLn46C              ->>>replace

@app.post("/audio_podcast")
def audio_podcast(req: AudioPodcastRequest):
    username = req.name
    hosts = req.hosts
    topicCat = req.topicCat
    hasvid = req.hasvid
    description = req.description
    first_host, second_host = hosts.split('-')
    character_map = {
    "Host": "1324",
    "Guest": "4567"
    }
    if(req.hosts=="vidhi-lily"):
        character_map["Host"] = "Oq0cIHWGcnbOGozOQv0t"
        character_map["Guest"] = "t4U671CQHG58R11znrVj"
    elif(req.hosts=="emads-marisaa"):
        character_map["Host"] = "jCxbkArMg3nfWZAmsdkB"
        character_map["Guest"] = "L0yTtpRXzdyzQlzALhgD"
    elif(req.hosts=='clara-mark'):
        character_map["Host"] = "EIsgvJT3rwoPvRFG6c4n"
        character_map["Guest"] = "3jR9BuQAOPMWUjWpi0ll"
    else:
        character_map["Host"] = "s3TPKV1kjDlVtZbl4Ksh"
        character_map["Guest"] = "Fz7HYdHHCP1EF1FLn46C"
    



    topic = req.topic
    model = LLM_setup()
    prompt = script_audio_podcast()
    chain = prompt | model

    response = chain.invoke({"topic": topic,"description":description,"first_name":first_host,"second_name":second_host})

    # This is probably a JSON string

    # Parse string to list of dicts
    try:
        parsed_content = json.loads(response.content)
    except json.JSONDecodeError as e:
        print("❌ Failed to parse LLM response as JSON:", e)
        return []

    updated_dialogue = [
        {
            "character": character_map.get(line["character"], line["character"]),
            "text": line["text"]
        }
        for line in parsed_content
    ]


    summery_promptt = summery_prompt()

    script = format_dialogue_lines(parsed_content)
    print(str(script))

    prompt_str = summery_promptt.format(script=script)
    response = model.invoke(prompt_str)



    img_url = fetch_unsplash_image(topic)
    print(img_url)

    print("✅ After cleaning ============================")

    api_keys = [
        os.getenv('el_api1'),
        os.getenv('el_api2'),
        os.getenv('el_api3'),
        os.getenv('el_api4'),
        os.getenv('el_api5'),
        os.getenv('el_api6'),
        os.getenv('el_api7'),
        os.getenv('el_api8'),
    ]
    newurl=''
    # for idx, key in enumerate(api_keys):
    #     try:
    #         print(f"Trying API key {idx + 1}/{len(api_keys)}...")
    #         client = ElevenLabs(api_key=key)
    #         url = genrate_audio(updated_dialogue, client)
    #         newurl = url
    #         break  # Exit loop on success
    #     except Exception as e:
    #         print(f"API key {idx + 1} failed: {e}")



    # filepath = download_file(url)
    # audio_url = upload_to_catbox(filepath)
    newurl = 'https://files.catbox.moe/krsqsa.mp3'
    store_video_link(video_url=newurl,username=username,hosts=hosts,hasvid=hasvid,title=str(topic),topicCat=topicCat,summary=response.content,transcript=str(script),img_url=img_url)
    return {"audio_url":newurl}

from sqlalchemy import select

class FecthInput(BaseModel):
    url:str

@app.post("/fetch_data")
def fetch_data(req: FecthInput):
    url = req.url
    with engine.connect() as conn:
        stmt = select(video_links).where(video_links.c.video_url == url).limit(1)
        result = conn.execute(stmt).fetchone()
    
    if result:
        # Convert SQLAlchemy Row object to dictionary
        print(result._mapping)
        return [{"response" :result._mapping}]  # ._mapping safely exposes the column names
    else:
        return {"error": "No data found for this URL"}


   

# if __name__ == "__main__":
#     uvicorn.run(app ,host="0.0.0.0", port=10000)
