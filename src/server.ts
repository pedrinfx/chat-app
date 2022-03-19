import { server } from './app';

server.listen(process.env.PORT || 4000, () => {
    console.log('🚀');
});
