import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    if event.get("httpMethod") != "POST":
        return {
            "statusCode": 405,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({"error": "Method not allowed"})
        }

    try:
        body = json.loads(event.get("body") or "{}")
        imovel_id = body.get("imovel_id")
        nome = body.get("nome")
        email = body.get("email")
        mensagem = body.get("mensagem")

        logger.info(f"Novo contato: imovel_id={imovel_id}, nome={nome}, email={email}, mensagem={mensagem}")

        # Aqui você poderia integrar com:
        # - serviço de e-mail (SendGrid/Mailgun/etc.)
        # - banco de dados
        # - planilha, etc.

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({"message": "Contato recebido com sucesso"})
        }
    except Exception as e:
        logger.exception("Erro ao processar contato")
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({"error": "Erro interno"})
        }
