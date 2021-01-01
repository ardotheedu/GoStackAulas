import {Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne,
    JoinColumn} from 'typeorm'

import User from './User'
@Entity('appointments')
class Appointment {
    //Aqui vai definir os tipos de dados
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User) // -> MODEL QUE ELE DEVE RETORNA QUANDO
    // ESSA FUNÇÃO FOR CHAMADA
    @JoinColumn({ name: 'provider_id' })
    // -> qual q coluna que vai identificar qual o prestador desse agendamento aqui
    provider: User;
    // Usamos isso por que depois conseguimos os dados completos do usuario
    // como nome, email diretamente a partir de uym agendamento

    @Column('timestamp with time zone')
    date: Date;
    
    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default Appointment;