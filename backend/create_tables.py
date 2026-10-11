from backend.app.database import Base, engine
import backend.app.models.entity

print(list(Base.metadata.tables.keys()))

Base.metadata.create_all(bind=engine)
