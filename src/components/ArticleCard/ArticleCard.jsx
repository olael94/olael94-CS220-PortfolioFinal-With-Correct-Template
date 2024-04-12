import './ArticleCard.css';
import PropTypes from 'prop-types';

const ArticleCard = (article) => {
  return (
    <article data-testid={'articleCard'} className="article-card">
      <div className="article-card-header">
        <time data-testid={'articleCardDate'}>{article.date}</time>
        <h2 data-testid={'articleCardTitle'}>{article.title}</h2>
      </div>
      <p data-testid={'articleCardContent'}>{article.content}</p>
      <a data-testid={'articleCardLink'} href={article.link}>
        Read article
      </a>
    </article>
  );
};

ArticleCard.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string,
};

ArticleCard.defaultProps = {
  link: '#',
};

export default ArticleCard;
