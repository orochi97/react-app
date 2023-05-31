import { Result } from 'antd';
import { Link } from 'react-router-dom';

import './index.less';

function NotFound() {
  return (
    <section className='not-found'>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to="/">Back Home</Link>}
      />
    </section>
  );
}

export default NotFound;