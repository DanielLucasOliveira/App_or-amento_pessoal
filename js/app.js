class Despesa { 
    constructor (ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados(){
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }
        return true;
    }
}

class Bd {

    constructor (){
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }
    gravar(despesa) {
        let id = this.getProximoId();
        localStorage.setItem(id, JSON.stringify(despesa));
        localStorage.setItem('id', id);
    }

    recuperarRegistros(){
        let id = localStorage.getItem('id');
        let despesas = [];
        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i));
            if (i === null){
                continue;
            }
            despesas.push(despesa);
        }
        return despesas
    }
}

let bd = new Bd();

function cadastrarDespesa() {
    
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let tipo = document.getElementById('tipo');
    let dia = document.getElementById('dia');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa (
        ano.value,
        mes.value,
        dia.value,
        descricao.value,
        tipo.value,
        valor.value
    )

    gravar(despesa)
}


function carregarListaDespesas() {
    bd.recuperarRegistros()
}

function gravar(despesa) {
    var modal = document.getElementById('modalRegistro')
    if (despesa.validarDados()) {
        document.getElementById('cor_texto').className = 'modal-header text-success';
        document.getElementById('modal_titulo').innerHTML = 'Registro realizado!';
        document.getElementById('modal_corpo').innerHTML = 'Despesa registrada com sucesso!';
        bd.gravar(despesa);
        var abreModal = new bootstrap.Modal(modal);
        abreModal.show();
    } else {
        document.getElementById('cor_texto').className = 'modal-header text-danger';
        document.getElementById('modal_titulo').innerHTML = 'Não foi possivel concluir o registro!';
        document.getElementById('modal_corpo').innerHTML = 'Preencha todos os campos!';

        var abreModal = new bootstrap.Modal(modal);
        abreModal.show();
    }

}