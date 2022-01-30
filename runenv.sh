cd frontend && npm run build
cd ../backend
rm -rf public/*
mv ../frontend/dist/* public
node app