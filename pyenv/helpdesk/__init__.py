from flask import Flask, Markup
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Nz6j2V6qgCekonBNgEAyoMUv99IUfztiZbXDVp2o6mE5vqNU7mDAybEuCWhswfm'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from helpdesk import routes