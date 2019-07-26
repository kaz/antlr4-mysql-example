SELECT *
FROM   ((SELECT p.id                            AS p_id,
                p.project_name                  AS p_name,
                p.desc                          AS p_desc,
                Count(DISTINCT pa_0.account_id) AS p_account_sum,
                Count(DISTINCT pr.resource_id)  AS p_resource_sum,
                p.network_id                    AS p_nwid,
                fp.`favourite`                  AS fp_p
         FROM   project AS p
                LEFT JOIN project_account AS pa_0
                       ON pa_0.project_id = p.id
                LEFT JOIN project_resource AS pr
                       ON ( pr.project_id = p.id
                            AND pr.status != 2 )
                LEFT JOIN favourite_project AS fp
                       ON ( fp.project_id = p.id
                            AND fp.account_id = pa_0.account_id )
         GROUP  BY p_id,
                   p_name,
                   p_desc,
                   p_nwid,
                   fp_p)
        UNION
        (SELECT p.id                            AS p_id,
                p.project_name                  AS p_name,
                p.desc                          AS p_desc,
                Count(DISTINCT pa_1.account_id) AS p_account_sum,
                Count(DISTINCT pr.resource_id)  AS p_resource_sum,
                p.network_id                    AS p_nwid,
                fp.`favourite`                  AS fp_p
         FROM   project AS p
                LEFT JOIN project_account AS pa_1
                       ON pa_1.project_id = p.id
                LEFT JOIN project_resource AS pr
                       ON ( pr.project_id = p.id
                            AND pr.status != 2 )
                INNER JOIN project_group AS pg
                        ON pg.project_id = p.id
                INNER JOIN `group` AS g
                        ON g.id = pg.group_id
                INNER JOIN group_account AS ga
                        ON ga.group_id = g.id
                LEFT JOIN favourite_project AS fp
                       ON ( ( fp.project_id = p.id
                              AND fp.account_id = pa_1.account_id )
                             OR ( fp.project_id = p.id
                                  AND fp.account_id = ga.account_id ) )
         GROUP  BY p_id,
                   p_name,
                   p_desc,
                   p_nwid,
                   fp_p)) T
GROUP  BY p_id -- remove duplicated project ID
ORDER  BY p_id DESC
LIMIT  0, 100;
