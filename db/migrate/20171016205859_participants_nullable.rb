class ParticipantsNullable < ActiveRecord::Migration[5.1]
  def change
    self.up
      change_column_null :participants, :opponent_id, true
      change_column_null :participants, :winner_id,   true
  end

end
