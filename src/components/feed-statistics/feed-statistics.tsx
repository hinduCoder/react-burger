import { FC } from 'react';
import { useAppSelector } from '../../utils/hooks';
import { OrderStatus } from '../../utils/types';
import styles from './feed-statistics.module.css';

const FeedStatistics: FC = () => {
    const { orders, total, totalToday } = useAppSelector(store => store.feed);

    const getNumbersByStatus = (status: OrderStatus) =>
        orders
            .filter(order => order.status === status)
            .slice(0, 5)
            .map(order => order.number);

    const pendingOrdersNumbers = getNumbersByStatus('pending');
    const doneOrdersNumbers = getNumbersByStatus('done');

    return (
        <section className={styles.stats}>
            <section className={styles.orders}>
                <section>
                    <h2 className="text text_type_main-medium mb-6">
                        Готовы:{' '}
                    </h2>
                    {doneOrdersNumbers.map(number => (
                        <p
                            className={`text text_type_digits-default mt-2 ${styles.in_progress}`}
                            key={number}>
                            {number}
                        </p>
                    ))}
                </section>
                <section>
                    <h2 className="text text_type_main-medium mb-6">
                        В работе:{' '}
                    </h2>
                    {pendingOrdersNumbers.map(number => (
                        <p
                            className="text text_type_digits-default mt-2"
                            key={number}>
                            {number}
                        </p>
                    ))}
                </section>
            </section>
            <h2 className="text text_type_main-medium mt-15">
                Выполнено за всё время
            </h2>
            <p className="text text_type_digits-large">{total}</p>
            <h2 className="text text_type_main-medium mt-15">
                Выполнено за сегодня
            </h2>
            <p className="text text_type_digits-large">{totalToday}</p>
        </section>
    );
};

export default FeedStatistics;
