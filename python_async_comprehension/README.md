async

coroutine :

async def ma_coroutine():
    print("Début")
    await autre_coroutine()
    print("Fin")