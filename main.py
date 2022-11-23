from flask import Flask, render_template, request

app = Flask(__name__, static_url_path='/static', static_folder='static', template_folder='templates')

registrovani = [("magor", "")]


@app.route('/', methods=['GET'])
def index():
    return render_template('uvod.html', ucastnici=registrovani), 200


@app.route('/registrace', methods=['GET'])
def registrace():
    return render_template('registrace.html'), 200


@app.route('/registrovat', methods=["POST"])
def registrovat():
    nick = request.form.get('nick').strip()
    je_plavec = int(request.form.get('je_plavec'))
    kamarad = request.form.get('kanoe_kamarad').strip()

    if nick in (x[0] for x in registrovani):
        return "Prezdivka musi byt unikatni.", 400

    if not je_plavec:
        return "Musite umet plavat.", 400

    if not (1 < len(nick) < 21):
        return "bro", 400

    if kamarad and not (1 < len(kamarad) < 21):
        return "bro", 400

    registrovani.append((nick, kamarad))

    return "Registrace byla uspesna", 200


@app.route('/api/nickname/<nick>', methods=["GET"])
def check_nickname(nick: str):
    return {"prihlasen": str(nick).strip() in (x[0] for x in registrovani)}, 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
