package dev.Finx.service;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoriaLegadaMigration implements ApplicationRunner {

    private final JdbcTemplate jdbcTemplate;

    public CategoriaLegadaMigration(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(ApplicationArguments args) {
        Integer legacyColumnCount = jdbcTemplate.queryForObject("""
                select count(*)
                from information_schema.columns
                where table_schema = current_schema()
                  and table_name = 'movimentacao_financeira'
                  and column_name = 'categoria'
                """, Integer.class);

        if (legacyColumnCount == null || legacyColumnCount == 0) {
            return;
        }

        List<String> categoriasLegadas = jdbcTemplate.queryForList("""
                select distinct categoria
                from movimentacao_financeira
                where categoria is not null and btrim(categoria) <> ''
                """, String.class);

        for (String nome : categoriasLegadas) {
            Long categoriaId = jdbcTemplate.query("""
                    select id from categoria
                    where nome = ? and tipo = 'Não definido'
                    limit 1
                    """, resultSet -> resultSet.next() ? resultSet.getLong("id") : null, nome);

            if (categoriaId == null) {
                categoriaId = jdbcTemplate.queryForObject("""
                        insert into categoria (nome, tipo)
                        values (?, 'Não definido')
                        returning id
                        """, Long.class, nome);
            }

            jdbcTemplate.update("""
                    update movimentacao_financeira
                    set categoria_id = ?
                    where categoria = ? and categoria_id is null
                    """, categoriaId, nome);
        }
    }
}
