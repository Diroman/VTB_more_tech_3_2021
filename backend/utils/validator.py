def QueryValidator(query) -> bool:
    QUERY = query.split("\n")
    if query.rfind("columns:") < 0 or query.rfind("tables:") < 0:
        return False

    col_ind = QUERY.index("columns:")
    tab_ind = QUERY.index("tables:")
    join_ind = 0
    fil_ind = 0
    grp_ind = 0

    join_src_list = []
    join_trg_list = []
    join_src_on_list = []
    join_trg_on_list = []

    filter_column_list = []
    filter_op_list = []
    filter_value_list = []

    if query.rfind("join:") > 0:
        join_ind = QUERY.index("join:")

    if query.rfind("filter:") > 0:
        fil_ind = QUERY.index("filter:")

    if query.rfind("group_by:") > 0:
        grp_ind = QUERY.index("group_by:")

    columns_list = QUERY[col_ind + 1 : tab_ind]

    if join_ind > 0:
        table_list = QUERY[tab_ind + 1 : join_ind]
        if fil_ind > 0:
            join_list = QUERY[join_ind + 1 : fil_ind]
            for i in range(len(join_list) // 5):
                join_src_list.append(join_list[5 * i + 1].split(": ")[1])
                join_trg_list.append(join_list[5 * i + 2].split(": ")[1])
                join_src_on_list.append(join_list[5 * i + 3].split(": ")[1])
                join_trg_on_list.append(join_list[5 * i + 4].split(": ")[1])
            if grp_ind > 0:
                filter_list = QUERY[fil_ind + 1 : grp_ind]
                for i in range(len(filter_list) // 4):
                    filter_column_list.append(filter_list[4 * i + 1].split(": ")[1])
                    filter_op_list.append(filter_list[4 * i + 2].split(": ")[1])
                    filter_value_list.append(filter_list[4 * i + 3].split(": ")[1])
                group_list = QUERY[grp_ind + 1 : -1]
            else:
                filter_list = QUERY[fil_ind + 1 : -1]
                for i in range(len(filter_list) // 4):
                    filter_column_list.append(filter_list[4 * i + 1].split(": ")[1])
                    filter_op_list.append(filter_list[4 * i + 2].split(": ")[1])
                    filter_value_list.append(filter_list[4 * i + 3].split(": ")[1])
        else:
            if grp_ind > 0:
                join_list = QUERY[join_ind + 1 : grp_ind]
                for i in range(len(join_list) // 5):
                    join_src_list.append(join_list[5 * i + 1].split(": ")[1])
                    join_trg_list.append(join_list[5 * i + 2].split(": ")[1])
                    join_src_on_list.append(join_list[5 * i + 3].split(": ")[1])
                    join_trg_on_list.append(join_list[5 * i + 4].split(": ")[1])
                group_list = QUERY[grp_ind + 1 : -1]
            else:
                join_list = QUERY[join_ind + 1 : -1]
    else:
        if fil_ind > 0:
            table_list = QUERY[tab_ind + 1 : fil_ind]
            if grp_ind > 0:
                filter_list = QUERY[fil_ind + 1 : grp_ind]
                for i in range(len(filter_list) // 4):
                    filter_column_list.append(filter_list[4 * i + 1].split(": ")[1])
                    filter_op_list.append(filter_list[4 * i + 2].split(": ")[1])
                    filter_value_list.append(filter_list[4 * i + 3].split(": ")[1])
                group_list = QUERY[grp_ind + 1 : -1]
            else:
                filter_list = QUERY[fil_ind + 1 : -1]
        else:
            if grp_ind > 0:
                table_list = QUERY[tab_ind + 1 : grp_ind]
                group_list = QUERY[grp_ind + 1 : -1]
            else:
                table_list = QUERY[tab_ind + 1 : -1]

    if (
        len(table_list) - 1 != len(join_list)
        or len(filter_column_list) != len(filter_op_list)
        or len(filter_op_list) != len(filter_value_list)
        or len(join_src_list) != len(join_trg_list)
        or len(join_trg_list) != len(join_src_on_list)
        or len(join_src_on_list) != len(join_trg_on_list)
    ):
        return False

    return True
