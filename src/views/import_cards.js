    for (const card of csvCards.value) {
        // add properties ease (1), occurrences(0), dueAt (currentDatetime)
        card.ease = 1
        card.occurrences = 0
        card.dueAt = new Date().toISOString()
        await store.addCard(card)
    }