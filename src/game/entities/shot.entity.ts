import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Game } from './game.entity';
  
  @Entity()
  export class Shot {
    @PrimaryGeneratedColumn()
    shot_id: number;
  
    @ManyToOne(() => Game, (game) => game.shots)
    game: Game;
  
    @Column({ type: 'varchar', length: 255 })
    coordinate: string;
  
    @Column({ type: 'boolean', default: false })
    is_hit: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  