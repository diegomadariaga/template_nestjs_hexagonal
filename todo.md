# agregar listar productos
# agregar eliminar productos
# agregar editar productos
# agregar error Exception Filter global
	•	Unificar formato de errores.
	•	Nunca exponer errores internos de DB.
	•	Mapear errores de dominio → HTTP status.

# Errores de Dominio

Crear clases propias:
	•	DomainError
	•	NotFoundError
	•	BusinessRuleViolationError

No lanzar HttpException desde dominio.



