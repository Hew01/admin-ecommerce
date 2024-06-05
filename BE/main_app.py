from flask import Flask, jsonify, send_file, send_from_directory, Blueprint, request
from flask_cors import CORS
import os, json
import api.categories_api
import api.coupons_api
import api.customer_api
import api.order_api
import api.posts_api
import api.product_api
import api.accounts_api
from function import products
from mongoDB.databaseAPI import parse_json
import api

app = Flask(__name__)
CORS(app)

app.register_blueprint(api.product_api.product_bp)
#/products/search
#/products/compact
#/products/all
#/products/<id>
#/products/update/<id>
#/products/remove/<id>
#/products/recommend/<id>/<int:quantity>
#/products/add


app.register_blueprint(api.order_api.order_bp)
#/orders/all
#/orders/<id>
#/orders/update/<id>
#/orders/remove/<id>
#/orders/add

app.register_blueprint(api.categories_api.category_bp)
#/orders/all
#/orders/<id>
#/orders/update/<id>
#/orders/remove/<id>
#/orders/add


app.register_blueprint(api.customer_api.customer_bp)
#/customers/all
#/customers/<id>
#/customers/update/<id>
#/customers/remove/<id>
#/customers/add

app.register_blueprint(api.coupons_api.coupon_bp)
#/coupons/all
#/coupons/<id>
#/coupons/update/<id>
#/coupons/remove/<id>
#/coupons/add

app.register_blueprint(api.accounts_api.account_bp)
#/accounts/login
#/accounts/logout
#/accounts/add
#/accounts/changepassword/<id>
#/accounts/remove/<id>

app.register_blueprint(api.posts_api.post_bp)


if __name__ == '__main__':
    app.run()
