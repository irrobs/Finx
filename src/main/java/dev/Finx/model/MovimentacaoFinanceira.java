package dev.Finx.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "MovimentacaoFinanceira")
public class MovimentacaoFinanceira {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;
    private LocalDate data;
    private Double valor;
    private String Categoria; //TODO: Mudar tipo para Categoria quando for criado o Enum

    public MovimentacaoFinanceira() {
    }

    public MovimentacaoFinanceira(Long id, String descricao, LocalDate data, Double valor, String categoria) {
        this.id = id;
        this.descricao = descricao;
        this.data = data;
        this.valor = valor;
        Categoria = categoria;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public String getCategoria() {
        return Categoria;
    }

    public void setCategoria(String categoria) {
        Categoria = categoria;
    }
}
