import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Game } from './game.entity';
  
  @Entity()
  export class Player {
    @PrimaryGeneratedColumn()
    player_id: number;
  
    @Column({ type: 'varchar', length: 255 })
    player_name: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @OneToMany(() => Game, (game) => game.player)
    games: Game[];
  }
  