import { FC, useEffect } from 'react';
import {
    useAppDispatch,
    useAppSelector,
    usePageTitle
} from '../../utils/hooks';
import { connect } from '../../services/feed';
import OrderHistory from '../../components/order-history/order-history';
import FeedStatistics from '../../components/feed-statistics/feed-statistics';
import styles from './feed-page.module.css';

const FeedPage: FC = () => {
    usePageTitle('Лента заказов');
    const orders = useAppSelector(store => store.feed.orders);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(connect());
    }, [dispatch]);

    return (
        <main className={styles.main}>
            <h1 className={`text text_type_main-large ${styles.header}`}>
                Лента заказов
            </h1>
            <section className={styles.content}>
                <section className={styles.feed}>
                    <OrderHistory orders={orders} />
                </section>
                <section className={styles.stats}>
                    <FeedStatistics />
                </section>
            </section>
        </main>
    );
};

export default FeedPage;
