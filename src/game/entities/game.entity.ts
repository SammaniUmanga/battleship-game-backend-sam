import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Player } from './player.entity';
  import { Ship } from './ship.entity';
  import { Shot } from './shot.entity';
  
  @Entity()
  export class Game {
    @PrimaryGeneratedColumn()
    game_id: number;
  
    @ManyToOne(() => Player, (player) => player.games)
    player: Player;
  
    @Column({ type: 'boolean', default: false })
    is_over: boolean;
  
    @Column({ type: 'varchar', default: 'ongoing', length: 100 })
    status: string;
  
    @Column({ type: 'varchar', length: 255 })
    grid_size: string; // e.g., '10x10'
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @OneToMany(() => Ship, (ship) => ship.game)
    ships: Ship[];
  
    @OneToMany(() => Shot, (shot) => shot.game)
    shots: Shot[];
  }
  