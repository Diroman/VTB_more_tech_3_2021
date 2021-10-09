# VTB_more_tech_3_2021

# Запрос данных из системы с помощью файла
Для получения необходимых данных заказчик может сформировать запрос необходимых данных, зафиксировав требования с помощью следующих правил:

## Общая структура файла:  
```
tables:     - Список используемых таблиц
- string  
  ...  
columns:    - Финальный список столбцов
- string    
- string  
  ...  
join:       - Правила объединения таблиц
- body:
    source: string      - Первая таблица
    target: string      - Вторая таблица
    source_on: string   - Поле для объединения из первой таблицы
    target_on: string   - Поле для объединения из второй таблицы
    type: enum          - Тип объединения (LEFT, RIGHT, OUTER, INNER)
- body:  
  ...  
filter:     - Правила фильтрации данных
- body:  
    column: string      - Столбец для условия
    op: Enum            - Операция сравнения
    value: string       - Значение для сравнения
- body:  
  ...  
group_by:   - Правила группировки данных
- string    - Поле группировки
  ...  
```
## Columns
Раздел отвечает за список необходимых полей, получаемых из источников. Допустимы математические и агрегатные функции, например:

```
count(tableA.col1)  
sum(0.5* tableA.col4 + 12)   
(tableA.col2 + ln(tableA.col2))* 0.5  
tableA.*  
...  
```

## Tables
```
columns:  
- tableA.col1  
- tableB.col2  
- sum(tableA.col3 * 12)  
- count(*)  
tables:  
- tableA  
- tableB  
join:  
- body:  
    source: tableA  
    target: tableB  
    source_on: tableA.col4  
    target_on: tableB.col4 
    type: LEFT 
filter:  
- body:  
    column: tableA.col5  
    op: Eq  
    value: 1488  
group_by:  
- tableA.col1  
- tableB.col2  
```