import React, { useEffect, useState } from 'react';
import styles from './Produto.module.css';
import { useParams } from 'react-router-dom';
import Head from './Head';

const Produto = () => {
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduto(url) {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setProduto(json);
      } catch (erro) {
        setError('Um erro ocorreu')
      } finally {
        setLoading(false);
      }
    }
    fetchProduto(`https://ranekapi.origamid.dev/json/api/produto/${id}`)
  }, [id])

  if (loading) return <div className="loading"></div>
  if (error) return <p>{error}</p>
  if (produto === null) return null;
  return (
    <section className={styles.produto + ' animeLeft'}>
      <Head title={`Ranek | ${produto.nome}`} description={`Ranek | Esse é um produto: ${produto.nome}`}/>
      <div>
        {produto.fotos.map((foto) => (
          <img key={foto.src} src={foto.src} alt={foto.titulo} />
        ))}
      </div>

      <div>
        <h1>{produto.nome}</h1>
        <span className={styles.preco}>R$ {produto.preco}</span>
        <p className={styles.descricao}>{produto.descricao}</p>
      </div>
    </section>
  )
}

export default Produto;