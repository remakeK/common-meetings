from backend.app.database import Base, engine

print(list(Base.metadata.tables.keys()))

Base.metadata.create_all(bind=engine)
