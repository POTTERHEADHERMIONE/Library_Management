from flask import Blueprint, jsonify, request
# from Database.admin_db import db
from Database.user_db import User_DB

user_bp = Blueprint('user_routes',__name__)

@user_bp.route('/login', methods=['POST'])
async def login() :
    data = request.get_json()
    return await User_DB.verify_creds(id = data['id'], password = data['password'])

@user_bp.route('/verify_token', methods=['POST'])
async def verify_token() :
    data = request.get_json()
    return await User_DB.verify_token(id = data['id'], token = data['token'])
