class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }
        return true;
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }
    gravar(despesa) {
        let id = this.getProximoId();
        localStorage.setItem(id, JSON.stringify(despesa));
        localStorage.setItem('id', id);
    }

    recuperarRegistros() {
        let despesas = [];
        let id = localStorage.getItem('id');
        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i));
            if (despesa === null) {
                continue;
            }
            despesa.id = i;
            despesas.push(despesa);
        }
        return despesas
    }

    pesquisar(despesa) {
        let despesasFiltradas = [];

        despesasFiltradas = this.recuperarRegistros();

        if (despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        if (despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        if (despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        if (despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        if (despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        if (despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        limpaCampos();
        return despesasFiltradas;
    }

    removerDespesa(id){
        localStorage.removeItem(id);
    }
}

function limpaCampos() {
    document.getElementById('ano').value = '';
    document.getElementById('mes').value = '';
    document.getElementById('dia').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
}

let bd = new Bd();

function cadastrarDespesa() {

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    gravar(despesa)
}


function carregarListaDespesas(despesas = []) {

    if (despesas.length == 0) {
        despesas = bd.recuperarRegistros();
    }
    let listaDespesas = document.getElementById('lista_despesas');

    despesas.forEach(function (d) {
        let row = listaDespesas.insertRow();

        row.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;

        switch (d.tipo) {
            case '1': d.tipo = 'Alimentação';
                break;
            case '2': d.tipo = 'Educação';
                break;
            case '3': d.tipo = 'Lazer';
                break;
            case '4': d.tipo = 'Saúde';
                break;
            case '5': d.tipo = 'TRansporte';
                break;
        }
        row.insertCell(1).innerHTML = d.tipo;
        row.insertCell(2).innerHTML = d.descricao;
        row.insertCell(3).innerHTML = d.valor;
        let btn = document.createElement('button');
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"></i>';  
        btn.id = `id_despesa${d.id}`;
        btn.onclick = function() {

            let id = this.id.replace('id_despesa', '');

            bd.removerDespesa(id);
            window.location.reload();
        }
        row.insertCell(4).append(btn);


    })

}

function gravar(despesa) {
    var modal = document.getElementById('modalRegistro')
    if (despesa.validarDados()) {
        document.getElementById('cor_texto').className = 'modal-header text-success';
        document.getElementById('modal_titulo').innerHTML = 'Registro realizado!';
        document.getElementById('modal_corpo').innerHTML = 'Despesa registrada com sucesso!';
        bd.gravar(despesa);
        limpaCampos();

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

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(
        ano,
        mes,
        dia,
        tipo,
        descricao,
        valor
    )

    let despesas = bd.pesquisar(despesa);

    let listaDespesas = document.getElementById('lista_despesas');
    listaDespesas.innerHTML = '';
    console.log(despesas);
    despesas.forEach(function (d) {
        let row = listaDespesas.insertRow();

        row.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;

        switch (d.tipo) {
            case '1': d.tipo = 'Alimentação';
                break;
            case '2': d.tipo = 'Educação';
                break;
            case '3': d.tipo = 'Lazer';
                break;
            case '4': d.tipo = 'Saúde';
                break;
            case '5': d.tipo = 'TRansporte';
                break;
        }
        row.insertCell(1).innerHTML = d.tipo;
        row.insertCell(2).innerHTML = d.descricao;
        row.insertCell(3).innerHTML = d.valor;

        


    })

}