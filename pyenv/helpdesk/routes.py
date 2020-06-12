import os
import time
import secrets
from flask import abort, flash, jsonify, make_response, redirect, render_template, request, url_for
from helpdesk import app, db
from helpdesk.security import encrypt_password, check_encrypted_password
from helpdesk.models import *
from sqlalchemy import inspect

def packageQuery(query):
  blob = []
  for i in range(len(query)):
    buf = row_as_dict(query[i])
    blob.append(buf)
  
  return blob

def row_as_dict(obj):
  return { c.key: getattr(obj, c.key) for c in inspect(obj).mapper.column_attrs }

@app.route("/")
@app.route("/home")
def home():
    page = request.args.get('page', 1, type=int)
    return render_template('home.html')

@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user and check_encrypted_password(data['password']):
          print(user)
          login_user(user)
          next_page = request.args.get('next')
          return redirect(next_page) if next_page else redirect(url_for('home'))
        else:
            return jsonify(success=0, message=str('That username or password was incorrect. Try again.'))
    else:
        return render_template('login.html', title='login')

@app.route("/ticketManager")
def ticketHome():
    return render_template('ticketManager.html', title='Tickets')

@app.route("/clients")
def clientHome():
  return render_template('clients.html', title='Clients')

@app.route("/admin", methods=["GET", "POST"])
def admin():
  return render_template('admin.html', title='Admin')

@app.route("/api/addUser", methods=["POST"])
def addUser():
  data = request.get_json()

  hashed_password = encrypt_password(data['password'])
  new_user = User(password=data['password'], email=data['email'],
                  fName=data['fName'], lName=data['lName'], group_id=data['select'], isActive=True)
  db.session.add(new_user)
  try:
    db.session.commit()
    return jsonify(success=0, message=str('User successfully added'))
  except NoResultFound:
    db.session.rollback()
    err_msg = err.args[0]
    if ("UNIQUE constraint failed: user.email" in err_msg) or ("UNIQUE constraint failed: user.username" in err_msg):
      return jsonify(success=0, message=str('That user already exists. Try again'))

@app.route("/api/getGroup")
def getGroup():
  d = Group.query.all()
  data = packageQuery(d)
  return jsonify(data=data)
  
  
@app.route("/api/addGroup", methods=["POST"])
def addGroup():
  data = request.get_json()

  new_group = Group(name=data['name'], desc=data['desc'])
  db.session.add(new_group)
  
  try:
    db.session.commit()
    
    return jsonify(success=0, message=str('Group successfully added'))
  except NoResultFound:
    db.session.rollback()
    err_msg = err.args[0]
    if ("UNIQUE constraint failed: group.name" in err_msg) or ("UNIQUE constraint failed: group.name" in err_msg):
      return jsonify(success=0, message=str('That group already exists. Try again'))