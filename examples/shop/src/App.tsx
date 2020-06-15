import React from 'react';
import { Button, ButtonGroup, Route, Router } from '@urban-bot/core';
import { Bucket } from './pages/Bucket';
import { Catalog } from './pages/Catalog';
import { ProductsProvider } from './store/products';
import { BucketProvider } from './store/bucket';

export function App() {
    return (
        <ProductsProvider>
            <BucketProvider>
                <ButtonGroup title={"Welcome to Shop! Type 'bucket' or 'catalog'."} isReplyButtons>
                    <Button>bucket</Button>
                    <Button>catalog</Button>
                </ButtonGroup>
                <Router>
                    <Route path="bucket">
                        <Bucket />
                    </Route>
                    <Route path="catalog">
                        <Catalog />
                    </Route>
                </Router>
            </BucketProvider>
        </ProductsProvider>
    );
}
