export const customFixture = async ({}, use: (r: string) => Promise<void>) => {
    // Setup logic here
    const myValue = "Hello from fixture"; 
    
    await use(myValue);
    
    // Teardown logic here
};