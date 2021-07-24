import { withAudit } from './SchemaCreators';

export const Movies = withAudit('Movies', {
    name: String,
    desc: String,
    title: String,
});
