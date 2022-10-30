
import { exec } from 'child_process';

import { toDiscord } from './discord';


const script = "C:\\Users\\ederh\\Desktop\\Lab\\_Lib\\Backup\\backup.js"
const cmd_start = `pm2 start ${script}`;
const cmd_stop = `pm2 stop backup`;


export const startJob = () => {
    toDiscord("Starting backup jobs");
    exec(cmd_start);
}

export function stopJob() {
    toDiscord("Stoping backup jobs");
    exec(cmd_stop);
}

export function restartJob() {
    toDiscord("Restarting backup jobs");
    stopJob();
    startJob();
}
