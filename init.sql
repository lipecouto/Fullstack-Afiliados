-- Criação da tabela transaction_type
CREATE TABLE transaction_type (
  tipo SERIAL PRIMARY KEY,
  descricao TEXT,
  natureza TEXT,
  sinal TEXT
);

-- Inserção de dados na tabela transaction_type
INSERT INTO transaction_type (tipo, descricao, natureza, sinal)
VALUES
  (1, 'Venda produtor', 'entrada', '+'),
  (2, 'Venda afiliado', 'entrada', '+'),
  (3, 'Comissão paga', 'saída', '-'),
  (4, 'Comissão recebida', 'entrada', '+');

-- Criação da tabela transaction
CREATE TABLE transaction (
  id SERIAL PRIMARY KEY,
  tipo INTEGER REFERENCES transaction_type (tipo),
  date TIMESTAMP WITH TIME ZONE,
  product TEXT,
  amount DOUBLE PRECISION,
  seller TEXT
);

-- Criação das constraints
ALTER TABLE transaction ADD CONSTRAINT fk_transaction_type FOREIGN KEY (tipo) REFERENCES transaction_type (tipo);
