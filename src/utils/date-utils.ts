export function toRelativeDateTimeString(dateString: string) {
    const relativeTimeFormat = new Intl.RelativeTimeFormat('ru', {
        style: 'long'
    });

    const date = new Date(dateString);
    const now = new Date();

    const dateDiff = now.getTime() - date.getTime();
    const daysDiff = Math.floor(dateDiff / (1000 * 60 * 60 * 24));

    let formattedDaysDiff = relativeTimeFormat.format(-daysDiff, 'days');

    if (daysDiff === 0) {
        formattedDaysDiff = 'Сегодня';
    } else if (daysDiff === 1) {
        formattedDaysDiff = 'Вчера';
    }

    return `${formattedDaysDiff}, ${date.toLocaleTimeString('ru', {
        timeStyle: 'short'
    })}`;
}
