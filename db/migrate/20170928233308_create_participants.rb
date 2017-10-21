class CreateParticipants < ActiveRecord::Migration[5.1]
  def change
    create_table :participants do |t|
      t.integer :opponent_id
      t.integer :owner_id
      t.integer :game_id
      t.integer :winner_id
      t.integer :waiting_for_user_id
      t.string :status
      t.text :game_data

      t.timestamps
    end
  end
end
