import uuid
from datetime import datetime
from . import db, bcrypt


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.String(30), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    username = db.Column(db.String(30), nullable=False, unique=True, index=True)
    email = db.Column(db.String(45), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)

    addresses = db.relationship('Address', back_populates="user", lazy=True)
    profile = db.relationship("Profile", back_populates="user", uselist=False)
    orders = db.relationship('Order', back_populates='user', lazy=True)
    cart = db.relationship('Cart', back_populates='user', lazy=True, cascade='all, delete-orphan')
    payment = db.relationship("Payment", back_populates='user', lazy=True, cascade='all, delete-orphan')
    transactions = db.relationship('Transaction', back_populates='user', lazy=True)
    checkouts = db.relationship('Checkout', back_populates='user', lazy=True)

    def setPassword(self, password):
        self.password_hash = bcrypt.generate_password_hash(password)

    def verifyPassword(self, password):
        return bcrypt.check_password_hash(password, self.password_hash)

    @classmethod
    def getUserByEmail(cls, email):
        return cls.query.filter_by(email=email).first()


class Address(db.Model):
    __tablename__ = 'address'
    id = db.Column(db.String(), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    user_id = db.Column(db.String(), db.ForeignKey('user.id'), nullable=False)
    county = db.Column(db.String, nullable=False, index=True)
    ward = db.Column(db.String, nullable=False, index=True)

    user = db.relationship('User', back_populates="addresses", lazy=True)
    checkouts = db.relationship('Checkout', back_populates='address', lazy=True, cascade="all, delete-orphan")


class Profile(db.Model):
    __tablename__ = "profile"
    id = db.Column(db.String(), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    user_id = db.Column(db.String(), db.ForeignKey('user.id'), nullable=False)
    first_name = db.Column(db.String(), nullable=False, index=True)
    last_name = db.Column(db.String(), nullable=False, index=True)
    phone_number = db.Column(db.String(), nullable=False, unique=True)  # Changed to String for consistency
    avatar = db.Column(db.String(), nullable=False)

    user = db.relationship('User', back_populates='profile', uselist=False)


class Product(db.Model):
    __tablename__ = "product"
    id = db.Column(db.String(), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    category_id = db.Column(db.String(), db.ForeignKey('category.id'), nullable=False)
    product_name = db.Column(db.String(), nullable=False, index=True)
    price = db.Column(db.Float(), nullable=False, index=True)
    quantity = db.Column(db.Integer(), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    category = db.relationship('Category', back_populates='products', lazy=True)
    order_items = db.relationship('OrderItems', back_populates='product', lazy=True)
    cart_items = db.relationship('CartItems', back_populates='product', lazy=True, cascade="all, delete-orphan")
    images = db.relationship('Image', back_populates="product", lazy=True, cascade="all, delete-orphan")


class Image(db.Model):
    __tablename__ = "image"
    id = db.Column(db.String(), primary_key=True, default=lambda: str(uuid.uuid4()), nullable=False, unique=True)
    product_id = db.Column(db.String(), db.ForeignKey('product.id'), nullable=False)
    image_url = db.Column(db.String(), nullable=False)

    product = db.relationship('Product', back_populates="images", lazy=True)


class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.String(), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    category_name = db.Column(db.String(), nullable=False, index=True)

    products = db.relationship('Product', back_populates='category', lazy=True)


class Order(db.Model):
    __tablename__ = 'order'
    id = db.Column(db.String(), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    user_id = db.Column(db.String(), db.ForeignKey('user.id'), nullable=False)
    
    total_price = db.Column(db.Float, nullable=False)
    order_date = db.Column(db.DateTime, default=db.func.current_timestamp())
    status = db.Column(db.String, nullable=False, default='Pending')
    shipping_address = db.Column(db.String(), nullable=False)
    payment_method = db.Column(db.String(), nullable=False)
    tracking_number = db.Column(db.String, nullable=False, index=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    
    user = db.relationship('User', back_populates='orders', lazy=True)
    order_items = db.relationship('OrderItems', back_populates='order', lazy=True, cascade='all, delete-orphan')
    checkouts = db.relationship('Checkout', back_populates='order', lazy=True, cascade='all, delete-orphan')
    transactions = db.relationship('Transaction', back_populates='order', lazy=True)
    payment = db.relationship('Payment', back_populates="order", lazy=True)


class OrderItems(db.Model):
    __tablename__ = "order_item"
    id = db.Column(db.String(), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    order_id = db.Column(db.String, db.ForeignKey('order.id'), nullable=False)
    product_id = db.Column(db.String, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, index=True)
    
    order = db.relationship('Order', back_populates='order_items', lazy=True)
    product = db.relationship('Product', back_populates='order_items', lazy=True)


class Cart(db.Model):
    __tablename__ = "cart"
    id = db.Column(db.String(), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    status = db.Column(db.String, default='active', nullable=False, index=True)
    total_amount = db.Column(db.Float, default=0.0, nullable=False)
    item_count = db.Column(db.Integer, default=0, nullable=False)
    
    user = db.relationship('User', back_populates='cart', lazy=True)
    cart_items = db.relationship("CartItems", back_populates="cart", lazy=True, cascade='all, delete-orphan')


class CartItems(db.Model):
    __tablename__ = 'cart_item'
    id = db.Column(db.String(), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    cart_id = db.Column(db.String, db.ForeignKey('cart.id'), nullable=False)
    product_id = db.Column(db.String(), db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    total_price = db.Column(db.Float, default=0.00, nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    cart = db.relationship('Cart', back_populates='cart_items')
    product = db.relationship('Product', back_populates='cart_items')


class Checkout(db.Model):
    __tablename__ = "checkout"
    id = db.Column(db.String(), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    order_id = db.Column(db.String(), db.ForeignKey('order.id'), nullable=False)
    address_id = db.Column(db.String(), db.ForeignKey('address.id'), nullable=False)
    user_id = db.Column(db.String(), db.ForeignKey('user.id'), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    order = db.relationship('Order', back_populates='checkouts')
    address = db.relationship('Address', back_populates='checkouts')
    user = db.relationship('User', back_populates='checkouts')


class Payment(db.Model):
    __tablename__ = "payment"
    id = db.Column(db.String(), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    user_id = db.Column(db.String(), db.ForeignKey('user.id'), nullable=False)
    order_id = db.Column(db.String(), db.ForeignKey('order.id'), nullable=False)
    
    amount = db.Column(db.Float, nullable=False)
    payment_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String, nullable=False)
    
    user = db.relationship('User', back_populates='payment', lazy=True)
    order = db.relationship('Order', back_populates='payment', lazy=True)


class Transaction(db.Model):
    __tablename__ = "transaction"
    id = db.Column(db.String(), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    order_id = db.Column(db.String(), db.ForeignKey('order.id'), nullable=False)
    user_id = db.Column(db.String(), db.ForeignKey('user.id'), nullable=False)
    
    amount = db.Column(db.Float, nullable=False)
    transaction_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String, nullable=False)
    
    order = db.relationship('Order', back_populates='transactions', lazy=True)
    user = db.relationship('User', back_populates='transactions', lazy=True)
