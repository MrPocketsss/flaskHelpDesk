from datetime import datetime
from helpdesk import db


# Parent table
class Group(db.Model):
  id   = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(25), unique=True, nullable=False)
  desc = db.Column(db.Text, nullable=False)
  
  def as_dict(self):
    return { c.name: getattr(self, c.name) for c in self.__table__.columns }
  
  def __repr__(self):
    return f"Group('{self.id}', '{self.name}', '{self.desc}')"
  
# Child Table
class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  password = db.Column(db.String(64), nullable=False)
  image_file = db.Column(db.String(20), nullable=False, default='default.png')
  email = db.Column(db.String(120), unique=True, nullable=False)
  fName = db.Column(db.String(40), nullable=False)
  lName = db.Column(db.String(40), nullable=False)
  isActive = db.Column(db.Boolean, nullable=False)
  group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=False)
  group = db.relationship('Group', backref=db.backref('users', uselist=True, cascade='delete,all'))
  
  def as_dict(self):
    return { c.name: getattr(self, c.name) for c in self.__table__.columns }