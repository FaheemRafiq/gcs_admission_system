type FormatType = 'formal' | 'informal';

type Formats = {
    formal: {
        date: string;
        datetime: string;
        time: string;
    };
    informal: {
        date: string;
        datetime: string;
        time: string;
    };
};

const formats: Formats = {
    formal: {
        date: 'Y-m-d',
        datetime: 'Y-m-d H:i:s',
        time: 'H:i:s',
    },
    informal: {
        date: 'd M Y',
        datetime: 'd M Y, h:i A',
        time: 'h:i A',
    },
};

function formatDate(date: Date | string, formatType: FormatType, formatKey: keyof Formats[FormatType]): string {
    return formatInto(date, formats[formatType][formatKey]);
}

function formatInto(date: Date | string, formatString: string): string {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;

    const pad = (num: number) => num.toString().padStart(2, '0');
    const year = parsedDate.getFullYear().toString();
    const month = pad(parsedDate.getMonth() + 1);
    const day = pad(parsedDate.getDate());
    const hours = pad(parsedDate.getHours());
    const minutes = pad(parsedDate.getMinutes());
    const seconds = pad(parsedDate.getSeconds());
    const ampm = parsedDate.getHours() >= 12 ? 'PM' : 'AM';
    const hour12 = pad(parsedDate.getHours() % 12 || 12);
    const shortMonth = parsedDate.toLocaleString('en-US', { month: 'short' });

    return formatString
        .replace('Y', year)
        .replace('m', month)
        .replace('d', day)
        .replace('H', hours)
        .replace('h', hour12)
        .replace('i', minutes)
        .replace('s', seconds)
        .replace('A', ampm)
        .replace('M', shortMonth);
}

export { formatDate, formats, formatInto };
