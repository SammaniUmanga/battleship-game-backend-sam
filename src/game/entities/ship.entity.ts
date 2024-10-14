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
  export class Ship {
    @PrimaryGeneratedColumn()
    ship_id: number;
  
    @ManyToOne(() => Game, (game) => game.ships)
    game: Game;
  
    @Column({ type: 'varchar', length: 255 })
    type: string;
  
    @Column({ type: 'int' })
    size: number;
  
    @Column({ type: 'varchar', length: 255 })
    coordinates: string;
  
    @Column({ type: 'boolean', default: false })
    is_sunk: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  