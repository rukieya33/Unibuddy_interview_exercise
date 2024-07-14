import * as fs from 'fs';
import * as path from 'path';
import { Tag } from '../conversation/models/CreateChatConversation.dto';
import { Condition } from 'babylonjs';

interface MyData {
  
  "Film & Cinema": [
    {
    category: " ",
    keyword : []
    }
  ];
  "Sport": [
    {
    sport1 : string,
    keyword : {}
    },
    {
    sport2 : string,
    keyword : []
    },
    {
    sport3 : string,
    keyword : []
    },
    {
      sport4 : string,
      keyword : []
    }
  ]
}



  //generates a list of suggested or customised tags for a single message/conversation
 export function generateListOfTags(text: string):Tag[]  {
  const myarray:Tag[] = []
  let interestingtopics:Tag[] = []
  let suggested:string[] = []

  try
  { 
    const regex = /[!@#$%^&*(),\s*.?":{}|<>]+/
    const withoutCharacters = text.toLowerCase()
    const txt:string[] = withoutCharacters.split(regex)
    
  
// Define the path to the JSON file
const filePath = path.join(__dirname, '../../src/tag/topicsOfInterest.json');

// Read the file synchronously
const jsonData = fs.readFileSync(filePath, 'utf-8');
const data: MyData = JSON.parse(jsonData);


 
    for (let j = 0; j <= txt.length-1; j++)
      {
       
           
        suggested = data['Film & Cinema'][0].keyword.filter((element) => element == txt[j])
        
      
        
        for (let p = 0; p <= suggested.length-1; p++)
          {
            
        
             interestingtopics.push({"id":`${Math.ceil(Math.random() * 1000000000)}`, "type":   suggested[p] })
             
          }
          
        
     
      }
      let customTags:string[] = []
      if (suggested.length == 0){
        customTags = customiseTags(txt)
        for (let a = 0; a <= customTags.length-1; a++)
          {
          
        interestingtopics.push({"id":`${Math.ceil(Math.random() * 1000000000)}`, "type":   customTags[a] })
      
      }
    }
    
  let messagesFound:Tag[] = findMessagesBasedOnTags(interestingtopics, txt)
  console.log(messagesFound)
}


  catch(Error)
  {
    console.error(Error)
  }

  return interestingtopics
 }
//generates customised tags based on what user's texts are in the message
function customiseTags(txt:string[]): string[]{
  const customTags = [];
  for (let y = 0; y <= txt.length-1; y++)
    {   
      
        customTags.push(txt[y])
       
    }

    return customTags;
}
/*Searches for messages of a specifc tag
Although this not the genuine way to filter messages by tags this functions shows the basic approach or logic behind 
searching for a list of messages that are based on a topic of interest of the user*/
function findMessagesBasedOnTags(interestingtopics:Tag[], txt:string[]):Tag[]
{
  let messages:Tag[] = []
  for (let index = 0; index <= txt.length-1; index++){
   messages = interestingtopics.filter((element) => element.type === txt[index])
  }
  return messages
}