/**
 * Author(s): @Brandon Le, @Jarod Heng
 * Contributor(s):
 * Purpose: Single Location for db schema names
 */
package com.revature.Revamedia.entities;

public class _SchemaName {
    private static final String public_schema = "public";
    private static final String stan_schema = "stan_schema";
    private static final String devops_schema = "devops_schema";

    /**
     *  Public variable to change schemas for database.
     */
    public static final String schemaName = public_schema;

    private _SchemaName() { }

}