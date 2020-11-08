import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({
    example: 'New Brand',
    description: 'The name of the Brand',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Street 10, KF1, Islamabad',
    description: 'The address of the Brand',
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}
