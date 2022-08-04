import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  constructor(id: string, newName: string, newEmail: string) {
    this.id = id;
    this.name = newName;
    this.email = newEmail;
  }

  @ApiProperty({ description: 'User ID', nullable: false })
  id: string;

  @ApiProperty({ description: 'User email', nullable: false })
  email: string;

  @ApiProperty({ description: 'User name', nullable: false })
  name: string;
}
