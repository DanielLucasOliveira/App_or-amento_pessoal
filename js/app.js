class Despesa { 
    constructor (ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }
}



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

    console.log(despesa);
}