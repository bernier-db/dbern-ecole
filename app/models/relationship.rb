class Relationship < ApplicationRecord
  belongs_to :user
  belongs_to :friend, :class_name => 'User', :foreign_key => 'friend_id'
  validates :user_id, presence: true
  validates :friend_id, presence: true

  def self.friendExist?(user_id, friend_id)
    return (Relationship.where("(user_id = (?) AND friend_id = (?)) OR (user_id = (?) AND friend_id = (?))", user_id,friend_id,friend_id,user_id).count > 0)
  end

end
