import json

def handler(event, context):
    listings = [
        {
            "id": 1,
            "titulo": "Apartamento mobiliado 2 quartos",
            "cidade": "Blumenau",
            "bairro": "Centro",
            "descricao": "Apartamento próximo a mercados, bancos e transporte público.",
            "quartos": 2,
            "banheiros": 1,
            "vaga_garagem": True,
            "tipo": "apartamento",
            "preco": 2200
        },
        {
            "id": 2,
            "titulo": "Casa ampla com quintal",
            "cidade": "Blumenau",
            "bairro": "Velha",
            "descricao": "Casa com amplo quintal e área de festas.",
            "quartos": 3,
            "banheiros": 2,
            "vaga_garagem": True,
            "tipo": "casa",
            "preco": 2800
        },
        {
            "id": 3,
            "titulo": "Kitnet compacta",
            "cidade": "Florianópolis",
            "bairro": "Trindade",
            "descricao": "Ideal para estudante, perto da universidade.",
            "quartos": 1,
            "banheiros": 1,
            "vaga_garagem": False,
            "tipo": "apartamento",
            "preco": 1500
        }
    ]

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(listings, ensure_ascii=False)
    }
