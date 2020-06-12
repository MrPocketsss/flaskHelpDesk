from datetime import datetime
from helpdesk import db, login_manager
from flask_login import UserMixin


#@login_manager.user_loaded
#def load_user(user_id):
#    return User.query.get(int(user_id))

#-----------------------------------------------------------------------------------------------------------------------
# Last, model connector tables for the many-to-many relationships
#-----------------------------------------------------------------------------------------------------------------------
userGroup    = db.Table('userGroup',
                     db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
                     db.Column('group_id', db.Integer, db.ForeignKey('group.id'), primary_key=True)
                     )
clientNote    = db.Table('clientNote',
                     db.Column('client_id', db.Integer, db.ForeignKey('client.id'), primary_key=True),
                     db.Column('note_id', db.Integer, db.ForeignKey('note.id'), primary_key=True)
                     )
clientTicket    = db.Table('clientTicket',
                     db.Column('client_id', db.Integer, db.ForeignKey('client.id'), primary_key=True),
                     db.Column('ticket_id', db.Integer, db.ForeignKey('ticket.id'), primary_key=True)
                     )
clientPhone    = db.Table('clientPhone',
                     db.Column('client_id', db.Integer, db.ForeignKey('client.id'), primary_key=True),
                     db.Column('phone_id', db.Integer, db.ForeignKey('phone.id'), primary_key=True)
                     )
orgPhone    = db.Table('orgPhone',
                     db.Column('organization_id', db.Integer, db.ForeignKey('organization.id'), primary_key=True),
                     db.Column('phone_id', db.Integer, db.ForeignKey('phone.id'), primary_key=True)
                     )
orgClient    = db.Table('orgClient',
                     db.Column('organization_id', db.Integer, db.ForeignKey('organization.id'), primary_key=True),
                     db.Column('client_id', db.Integer, db.ForeignKey('client.id'), primary_key=True)
                     )
orgTicket    = db.Table('orgTicket',
                     db.Column('organization_id', db.Integer, db.ForeignKey('organization.id'), primary_key=True),
                     db.Column('ticket_id', db.Integer, db.ForeignKey('ticket.id'), primary_key=True)
                     )
ticketUser    = db.Table('ticketTech',
                     db.Column('ticket_id', db.Integer, db.ForeignKey('ticket.id'), primary_key=True),
                     db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
                     )
ticketNote    = db.Table('ticketNote',
                     db.Column('ticket_id', db.Integer, db.ForeignKey('ticket.id'), primary_key=True),
                     db.Column('note_id', db.Integer, db.ForeignKey('note.id'), primary_key=True)
                     )

#-----------------------------------------------------------------------------------------------------------------------
# First, model tables with one-to-one relationships
#-----------------------------------------------------------------------------------------------------------------------
class Theme(db.Model):
  id   = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(25), unique=True, nullable=False)
  
  
class EmailType(db.Model):
  id   = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(25), unique=True, nullable=False)
  
  
class PhoneType(db.Model):
  id   = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(25), unique=True, nullable=False)
  
  
class Status(db.Model):
  id   = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(25), unique=True, nullable=False)
  
  
class Address(db.Model):
  id       = db.Column(db.Integer, primary_key=True)
  street_1 = db.Column(db.String(100), nullable=False)
  street_2 = db.Column(db.String(100))
  city     = db.Column(db.String(100), nullable=False)
  county   = db.Column(db.String(100))
  state    = db.Column(db.String(100), nullable=False)
  country  = db.Column(db.String(100), nullable=False)
  zip      = db.Column(db.Integer, nullable=False)
#-----------------------------------------------------------------------------------------------------------------------
# Next, model tables with one-to-many relationships
#-----------------------------------------------------------------------------------------------------------------------
class Email(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  address = db.Column(db.String(64), unique=True, nullable=False)
  clientID = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
#-----------------------------------------------------------------------------------------------------------------------
# Then, model tables with many-to-many relationships
#-----------------------------------------------------------------------------------------------------------------------
class User(db.Model, UserMixin):
  id         = db.Column(db.Integer, primary_key=True)
  username   = db.Column(db.String(25), unique=True, nullable=False)
  password   = db.Column(db.String(64), nullable=False)
  image_file = db.Column(db.String(20), nullable=False, default='default.png')
  email      = db.Column(db.String(120), unique=True, nullable=False)
  fName      = db.Column(db.String(40), nullable=False)
  lName      = db.Column(db.String(40), nullable=False)
  isActive   = db.Column(db.Boolean)
  #themes    = db.relationship('Theme', backref='user', lazy=True, uselist=False)
  groups     = db.relationship('Group', secondary=userGroup, backref=db.backref('user', lazy='dynamic'))
  
  
class Group(db.Model):
  id   = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(25), unique=True, nullable=False)
  
  
class Note(db.Model):
  id      = db.Column(db.Integer, primary_key=True)
  title   = db.Column(db.String(60), nullable=False)
  content = db.Column(db.Text, nullable=False)


class Phone(db.Model):
  id        = db.Column(db.Integer, primary_key=True)
  number    = db.Column(db.String(10), unique=True, nullable=False)
  phoneType = db.relationship('PhoneType', backref='phone', lazy=True, uselist=False)
  
  
class Client(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  firstName = db.Column(db.String(40))
  lastName = db.Column(db.String(40))
  email = db.Column(db.Integer, db.ForeignKey('email.id'), nullable=False)
  notes = db.relationship('Note', secondary=clientNote, backref=db.backref('client', lazy='dynamic'))
  tickets = db.relationship('Ticket', secondary=clientTicket, backref=db.backref('client', lazy='dynamic'))
  phones = db.relationship('Phone', secondary=clientPhone, backref=db.backref('client', lazy='dynamic'))
  

class Organization(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False, unique=True)
  isActive = db.Column(db.Boolean, nullable=False)
  address= db.Column(db.Integer, db.ForeignKey('organization.id'), nullable=False)
  phone = db.relationship('Phone', secondary=orgPhone, backref='organization', lazy='dynamic')
  

class Ticket(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  problem = db.Column(db.Text)
  action = db.Column(db.Text)
  dateCreated = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
  status = db.Column(db.Integer, db.ForeignKey('status.id'), nullable=False)