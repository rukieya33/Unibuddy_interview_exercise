import { ApiProperty } from '@nestjs/swagger';
import { Permission } from './Permission.dto';
import { Product, Context } from './ContextSchema.dto';
import { ChatMessage } from '../../message/models/message.entity';
import { generateListOfTags } from '../../tag/tag';

export enum TagType {
  subTopic = 'subTopic',
}

export class Tag {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  type: string;

}
 //Pass text from client-side to generateListOfTags function and set the return value of the fucntion to the tags member variable of this class
const message = new ChatMessage()
const txt = message.text
 

export class CreateChatConversationDto {

  @ApiProperty()
  product: Product;

  @ApiProperty({ type: [Context] })
  context: Context[];

  @ApiProperty({ type: [Permission], required: false, default: [] })
  permissions?: Permission[];

  @ApiProperty({ type:[Tag], required: false })
 
  tags:Tag[] = generateListOfTags(txt) ; 

  @ApiProperty({ type: [String], required: false })
  memberIds?: string[];

  @ApiProperty({ type: [String], required: false })
  blockedMemberIds?: string[];
 


}


