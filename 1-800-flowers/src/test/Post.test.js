import { render, fireEvent, waitFor, screen, getByText, getByPlaceholderText, getByRole, getByTestId } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'

import store from '../redux/store'
import { Provider } from 'react-redux'
import SearchInput from '../components/SearchInput'
import userEvent from '@testing-library/user-event'
import PostDetail from '../components/PostDetail'

describe('Post Testing', () => {
    it('should display the search input', () => {
        render(
            <Provider store={store}>
                <SearchInput title={['Hello there', "hi hello"]} postChange={() => { }} updatedPost={() => { }} />
            </Provider>
        )
        expect(screen.getByRole('combobox')).toBeVisible()
    })

    it('should display the autosuggest when type on the Search input', () => {
        render(
            <Provider store={store}>
                <SearchInput title={['Hello there', "hi hello"]} postChange={() => { }} updatedPost={() => { }} />
            </Provider>
        )

        // userEvent.click(screen.getByRole('combobox'))
        userEvent.type(screen.getByTestId('search-input'), 'a')
        expect(screen.getAllByRole('presentation')[0]).toBeVisible()
    })

    it('should show the Post Detail once selected from the dropdown', () => {
        render(<Provider store={store}>
            <SearchInput title={['Hello there', "hi hello"]} postChange={() => { }} updatedPost={() => { }} />
            <PostDetail post={{
                body: "hello there",
                id: 1,
                title: "test 2",
                userId: 1
            }} openSuccess={false} />
        </Provider>)

        userEvent.type(screen.getByTestId('search-input'), 'e')
        userEvent.click(screen.getAllByRole('option')[0])
        expect(screen.getByTestId('post-detail')).toBeVisible()
    })

    it('should show the edit input once edit button is clicked', () => {
        render(<Provider store={store}>
            <SearchInput title={['Hello there', "hi hello"]} postChange={() => { }} updatedPost={() => { }} />
            <PostDetail post={{
                body: "hello there",
                id: 1,
                title: "test 2",
                userId: 1
            }} openSuccess={false} />
        </Provider>)

        userEvent.type(screen.getByTestId('search-input'), 'e')
        userEvent.click(screen.getAllByRole('option')[0])
        userEvent.click(screen.getByTestId('edit-button'))
        expect(screen.getByTestId('title-edit')).toBeVisible()
        expect(screen.getByTestId('body-edit')).toBeVisible()
    })
})